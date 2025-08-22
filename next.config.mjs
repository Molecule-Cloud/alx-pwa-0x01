import withPWAInit from "@duncan2912/next-pwa";

const withPWA = withPWAInit({
    dest: 'public'
})

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['m.media-amazon.com']
    },
}

export default withPWA({
    ...nextConfig
})