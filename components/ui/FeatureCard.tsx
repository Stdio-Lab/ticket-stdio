import { Box, Text } from "@gluestack-ui/themed"

type FeaturedCardProps = {
  title: string
  bgColor?: string
}

export default function FeaturedCard({ title, bgColor = "$primary200" }: FeaturedCardProps) {
  return (
    <Box bg={bgColor} p={4} borderRadius={8}>
      <Text>{title}</Text>
    </Box>
  )
}
