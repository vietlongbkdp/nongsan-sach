import { Card, CardContent, CardActions, Box, Skeleton } from '@mui/material'

export default function ProductCardSkeleton() {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1.5px solid', borderColor: 'rgba(0,0,0,0.05)' }}>
      {/* Image area */}
      <Skeleton variant="rectangular" sx={{ aspectRatio: '1/1', width: '100%' }} animation="wave" />

      <CardContent sx={{ flex: 1, pb: 1 }}>
        {/* Category chip */}
        <Skeleton variant="rounded" width={70} height={20} sx={{ mb: 1, borderRadius: 10 }} animation="wave" />
        {/* Name */}
        <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 0.5 }} animation="wave" />
        <Skeleton variant="text" width="60%" sx={{ fontSize: '0.8rem', mb: 1 }} animation="wave" />
        {/* Description */}
        <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} animation="wave" />
        <Skeleton variant="text" width="80%" sx={{ fontSize: '0.8rem' }} animation="wave" />
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Skeleton variant="text" width={90} height={32} animation="wave" />
          <Skeleton variant="text" width={40} height={16} animation="wave" />
        </Box>
        <Skeleton variant="rounded" width={80} height={34} sx={{ borderRadius: 2.5 }} animation="wave" />
      </CardActions>
    </Card>
  )
}
