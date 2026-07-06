import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Setup directories
const artifactsDir = 'C:/Users/CODECLOUDS-ARNAB/.gemini/antigravity-ide/brain/2a48daed-8e99-4df4-a954-b2c1e98bab52';
const publicProductsDir = path.resolve(__dirname, 'public/assets/products');
const publicBlogDir = path.resolve(__dirname, 'public/assets/blog');

try {
  fs.mkdirSync(publicProductsDir, { recursive: true });
  fs.mkdirSync(publicBlogDir, { recursive: true });

  if (fs.existsSync(artifactsDir)) {
    const files = fs.readdirSync(artifactsDir);
    
    const copyPattern = (prefix, destPath) => {
      const match = files.find(f => f.startsWith(prefix) && f.endsWith('.png'));
      if (match) {
        fs.copyFileSync(path.join(artifactsDir, match), destPath);
        console.log(`[Asset Setup] Copied ${match} -> ${path.relative(__dirname, destPath)}`);
        return true;
      }
      return false;
    };

    // Main products
    copyPattern('oravox_halo_1_', path.join(publicProductsDir, 'oravox-halo-1.webp'));
    copyPattern('oravox_halo_2_', path.join(publicProductsDir, 'oravox-halo-2.webp'));
    copyPattern('oravox_cove_1_', path.join(publicProductsDir, 'oravox-cove-1.webp'));
    copyPattern('oravox_cove_2_', path.join(publicProductsDir, 'oravox-cove-2.webp'));
    copyPattern('oravox_drift_1_', path.join(publicProductsDir, 'oravox-drift-1.webp'));
    copyPattern('oravox_drift_2_', path.join(publicProductsDir, 'oravox-drift-2.webp'));
    copyPattern('oravox_thread_1_', path.join(publicProductsDir, 'oravox-thread-1.webp'));
    copyPattern('oravox_thread_2_', path.join(publicProductsDir, 'oravox-thread-2.webp'));
    copyPattern('oravox_edge_1_', path.join(publicProductsDir, 'oravox-edge-1.webp'));
    copyPattern('oravox_edge_2_', path.join(publicProductsDir, 'oravox-edge-2.webp'));
    copyPattern('oravox_wrap_1_', path.join(publicProductsDir, 'oravox-wrap-1.webp'));
    copyPattern('oravox_wrap_2_', path.join(publicProductsDir, 'oravox-wrap-2.webp'));
    copyPattern('oravox_cairn_1_', path.join(publicProductsDir, 'oravox-cairn-1.webp'));
    copyPattern('oravox_cairn_2_', path.join(publicProductsDir, 'oravox-cairn-2.webp'));
    copyPattern('oravox_hearth_1_', path.join(publicProductsDir, 'oravox-hearth-1.webp'));
    copyPattern('oravox_hearth_2_', path.join(publicProductsDir, 'oravox-hearth-2.webp'));
    copyPattern('oravox_skiff_1_', path.join(publicProductsDir, 'oravox-skiff-1.webp'));

    // Fallbacks for non-generated items
    copyPattern('oravox_skiff_1_', path.join(publicProductsDir, 'oravox-skiff-2.webp'));
    copyPattern('oravox_drift_1_', path.join(publicProductsDir, 'oravox-anchor-1.webp'));
    copyPattern('oravox_drift_2_', path.join(publicProductsDir, 'oravox-anchor-2.webp'));
    
    // Blog fallbacks
    copyPattern('oravox_hearth_2_', path.join(publicBlogDir, 'acoustic-engineering.webp'));
    copyPattern('oravox_thread_1_', path.join(publicBlogDir, 'beryllium-drivers.webp'));
    copyPattern('oravox_halo_2_', path.join(publicBlogDir, 'understanding-anc.webp'));
  }
} catch (err) {
  console.error('[Asset Setup] Error copying files:', err);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
