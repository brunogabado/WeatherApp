import StyledComponentsRegistry from '../lib/registry'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html >
      <body style={{ margin: '0', padding: '0' }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html >
  )
}
