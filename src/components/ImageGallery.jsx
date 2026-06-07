import { useState, useEffect, useRef, useCallback } from 'react'
import { Box, IconButton, Modal, Tooltip } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import FullscreenIcon from '@mui/icons-material/Fullscreen'

const PLACEHOLDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%25" height="100%25" fill="%23f0fdf4"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="80" font-family="serif">🌿</text></svg>'

export default function ImageGallery({ images = [], alt = '' }) {
  const imgs = images.length > 0 ? images.map((i) => i.url || i) : [PLACEHOLDER]
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef({ startX: 0, startY: 0, panX: 0, panY: 0 })
  const mainRef = useRef()

  // Hover magnifier state
  const [hoverPos, setHoverPos] = useState({ x: 50, y: 50 })
  const [hovering, setHovering] = useState(false)

  const prev = useCallback(() => { setActive((a) => (a - 1 + imgs.length) % imgs.length) }, [imgs.length])
  const next = useCallback(() => { setActive((a) => (a + 1) % imgs.length) }, [imgs.length])

  // Reset pan/zoom when lightbox closes or image changes
  useEffect(() => { setZoom(1); setPan({ x: 0, y: 0 }) }, [lightbox, active])

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') setLightbox(false)
      else if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(5, z + 0.5))
      else if (e.key === '-') setZoom((z) => Math.max(1, z - 0.5))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, prev, next])

  // Scroll to zoom in lightbox
  const handleWheel = useCallback((e) => {
    e.preventDefault()
    setZoom((z) => {
      const next = z - e.deltaY * 0.005
      return Math.min(5, Math.max(1, next))
    })
  }, [])

  useEffect(() => {
    const el = mainRef.current
    if (!el || !lightbox) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [lightbox, handleWheel])

  // Drag to pan in lightbox
  const onMouseDown = (e) => {
    if (zoom <= 1) return
    e.preventDefault()
    setDragging(true)
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y }
  }
  const onMouseMove = (e) => {
    if (!dragging) return
    setPan({
      x: dragRef.current.panX + e.clientX - dragRef.current.startX,
      y: dragRef.current.panY + e.clientY - dragRef.current.startY,
    })
  }
  const onMouseUp = () => setDragging(false)

  // Touch swipe
  const touchRef = useRef({ startX: 0 })
  const onTouchStart = (e) => { touchRef.current.startX = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    const diff = touchRef.current.startX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
  }

  // Hover magnifier on main image (non-lightbox)
  const onMainMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoverPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, userSelect: 'none' }}>
        {/* Main image */}
        <Box
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={onMainMouseMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={() => setLightbox(true)}
          sx={{
            position: 'relative', borderRadius: 3, overflow: 'hidden',
            aspectRatio: '1/1', bgcolor: '#f7fdf4', cursor: 'zoom-in',
            border: '1.5px solid', borderColor: '#e0f0e5',
          }}
        >
          <Box
            component="img"
            src={imgs[active]}
            alt={alt}
            onError={(e) => { e.target.src = PLACEHOLDER }}
            sx={{
              width: '100%', height: '100%', objectFit: 'cover',
              display: 'block',
              transformOrigin: `${hoverPos.x}% ${hoverPos.y}%`,
              transform: hovering ? 'scale(1.65)' : 'scale(1)',
              transition: hovering ? 'none' : 'transform 0.35s ease',
            }}
          />

          {/* Open lightbox hint */}
          <Box sx={{
            position: 'absolute', bottom: 10, right: 10, bgcolor: 'rgba(0,0,0,0.45)',
            borderRadius: 1.5, px: 1, py: 0.5, display: 'flex', alignItems: 'center', gap: 0.5,
            opacity: hovering ? 1 : 0, transition: 'opacity 0.2s',
          }}>
            <FullscreenIcon sx={{ color: 'white', fontSize: 16 }} />
          </Box>

          {/* Navigation arrows (show when >1 image) */}
          {imgs.length > 1 && (
            <>
              <IconButton onClick={(e) => { e.stopPropagation(); prev() }}
                sx={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.85)', width: 30, height: 30, '&:hover': { bgcolor: 'white' } }}>
                <ChevronLeftIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton onClick={(e) => { e.stopPropagation(); next() }}
                sx={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.85)', width: 30, height: 30, '&:hover': { bgcolor: 'white' } }}>
                <ChevronRightIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </>
          )}

          {/* Image counter */}
          {imgs.length > 1 && (
            <Box sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', bgcolor: 'rgba(0,0,0,0.45)', borderRadius: 10, px: 1.2, py: 0.3 }}>
              <Box sx={{ color: 'white', fontSize: 11, fontWeight: 600 }}>{active + 1} / {imgs.length}</Box>
            </Box>
          )}
        </Box>

        {/* Thumbnails */}
        {imgs.length > 1 && (
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5, '&::-webkit-scrollbar': { height: 4 }, '&::-webkit-scrollbar-thumb': { bgcolor: '#b7e4c7', borderRadius: 2 } }}>
            {imgs.map((src, i) => (
              <Box
                key={i}
                onClick={() => setActive(i)}
                sx={{
                  flexShrink: 0, width: 72, height: 72, borderRadius: 2, overflow: 'hidden', cursor: 'pointer',
                  border: '2.5px solid', borderColor: i === active ? 'primary.main' : '#e0f0e5',
                  opacity: i === active ? 1 : 0.6, transition: 'all 0.2s',
                  '&:hover': { opacity: 1, borderColor: 'primary.light' },
                }}
              >
                <Box component="img" src={src} alt={`${alt} ${i + 1}`} onError={(e) => { e.target.src = PLACEHOLDER }}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* ── LIGHTBOX ── */}
      <Modal open={lightbox} onClose={() => setLightbox(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ outline: 'none', position: 'relative', width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.93)', display: 'flex', flexDirection: 'column' }}>
          {/* Top bar */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1.5, zIndex: 10 }}>
            <Box sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600 }}>
              {alt} · {active + 1} / {imgs.length}
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Tooltip title="Thu nhỏ (-)">
                <span><IconButton onClick={() => setZoom((z) => Math.max(1, z - 0.5))} disabled={zoom <= 1} sx={{ color: 'white', opacity: zoom <= 1 ? 0.3 : 1 }}>
                  <ZoomOutIcon />
                </IconButton></span>
              </Tooltip>
              <Box sx={{ color: 'white', fontSize: 13, fontWeight: 700, minWidth: 40, textAlign: 'center' }}>
                {Math.round(zoom * 100)}%
              </Box>
              <Tooltip title="Phóng to (+)">
                <span><IconButton onClick={() => setZoom((z) => Math.min(5, z + 0.5))} disabled={zoom >= 5} sx={{ color: 'white', opacity: zoom >= 5 ? 0.3 : 1 }}>
                  <ZoomInIcon />
                </IconButton></span>
              </Tooltip>
              <Tooltip title="Đặt lại zoom"><IconButton onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }) }} sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>1:1</IconButton></Tooltip>
              <Tooltip title="Đóng (Esc)"><IconButton onClick={() => setLightbox(false)} sx={{ color: 'white' }}><CloseIcon /></IconButton></Tooltip>
            </Box>
          </Box>

          {/* Main lightbox image */}
          <Box
            ref={mainRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onDoubleClick={() => { setZoom(1); setPan({ x: 0, y: 0 }) }}
            sx={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
            }}
          >
            <Box
              component="img"
              src={imgs[active]}
              alt={alt}
              onError={(e) => { e.target.src = PLACEHOLDER }}
              sx={{
                maxWidth: '90vw', maxHeight: '80vh',
                objectFit: 'contain', borderRadius: 2,
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                transition: dragging ? 'none' : 'transform 0.25s ease',
                pointerEvents: 'none',
              }}
            />
          </Box>

          {/* Navigation */}
          {imgs.length > 1 && (
            <>
              <IconButton onClick={prev}
                sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.12)', color: 'white', width: 48, height: 48, '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' } }}>
                <ChevronLeftIcon sx={{ fontSize: 28 }} />
              </IconButton>
              <IconButton onClick={next}
                sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.12)', color: 'white', width: 48, height: 48, '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' } }}>
                <ChevronRightIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </>
          )}

          {/* Bottom thumbnails */}
          {imgs.length > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, pb: 2.5, px: 2, overflowX: 'auto' }}>
              {imgs.map((src, i) => (
                <Box key={i} onClick={() => setActive(i)}
                  sx={{ flexShrink: 0, width: 56, height: 56, borderRadius: 1.5, overflow: 'hidden', cursor: 'pointer', border: '2px solid', borderColor: i === active ? '#74c69d' : 'rgba(255,255,255,0.2)', opacity: i === active ? 1 : 0.5, transition: 'all 0.2s', '&:hover': { opacity: 1 } }}>
                  <Box component="img" src={src} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              ))}
            </Box>
          )}

          <Box sx={{ textAlign: 'center', pb: 1.5, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
            Scroll để zoom · Kéo để di chuyển · ← → để chuyển ảnh · Double-click để reset · Esc để đóng
          </Box>
        </Box>
      </Modal>
    </>
  )
}
