import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { exec } from 'child_process'
import path from 'path'

// Custom Vite plugin to watch and convert Excel files to JSON in real-time
function excelWatcherPlugin() {
  return {
    name: 'excel-watcher',
    configureServer(server: any) {
      const excelFiles = [
        path.resolve(__dirname, 'bhavika_menu_master_unique.xlsx'),
        path.resolve(__dirname, 'cloudinary_gallery_mapping.xlsx'),
      ]
      
      server.watcher.add(excelFiles)
      server.watcher.on('change', (filePath: string) => {
        if (filePath.endsWith('bhavika_menu_master_unique.xlsx')) {
          console.log('\n[Vite Excel Watcher] Menu spreadsheet changed. Converting...')
          exec('python scripts/convert_menu.py', (err, stdout, _stderr) => {
            if (err) {
              console.error('[Vite Excel Watcher] Error running convert_menu.py:', err)
            } else {
              console.log(stdout.trim())
            }
          })
        } else if (filePath.endsWith('cloudinary_gallery_mapping.xlsx')) {
          console.log('\n[Vite Excel Watcher] Gallery spreadsheet changed. Converting...')
          exec('python scripts/convert_gallery.py', (err, stdout, _stderr) => {
            if (err) {
              console.error('[Vite Excel Watcher] Error running convert_gallery.py:', err)
            } else {
              console.log(stdout.trim())
            }
          })
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    excelWatcherPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js',
      },
    },
  },
})
