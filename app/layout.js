import './globals.css'
import 'github-markdown-css/github-markdown-light.css'

export const metadata = {
  title: 'Smart GitHub Profile README Generator',
  description: 'Create beautiful GitHub profile README files with interactive forms and live preview',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}