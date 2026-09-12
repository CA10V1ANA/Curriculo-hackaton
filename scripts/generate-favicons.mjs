/**
 * generate-favicons.mjs
 *
 * Gera todos os arquivos de favicon a partir do favicon.svg fonte.
 *
 * Saídas:
 *   public/favicon.svg         → mantido como está (já é o SVG de origem)
 *   public/favicon.png         → 180×180px RGBA (Apple Touch Icon)
 *   public/favicon-32.png      → 32×32px (intermediário, para montar ICO)
 *   public/favicon-48.png      → 48×48px (intermediário, para montar ICO)
 *   public/favicon-16.png      → 16×16px (intermediário, para montar ICO)
 *   public/favicon.ico         → ICO multi-tamanho: 16 + 32 + 48px
 *
 * Por que cada tamanho:
 *   16px → aba do navegador e barra de favoritos
 *   32px → favicon padrão na maioria dos contextos desktop
 *   48px → atalhos do Windows na barra de tarefas
 *  180px → Apple Touch Icon (ícone do app no iPhone/iPad)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Em ES Modules, __dirname não existe — precisamos derivar do import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

console.log('🎨 Gerando favicons a partir de:', svgPath);

// ─── Lê o SVG de origem ───────────────────────────────────────────────────────
const svgBuffer = fs.readFileSync(svgPath);

// ─── Tamanhos para gerar ──────────────────────────────────────────────────────
const sizes = [16, 32, 48, 180];

// Gera todos os PNGs em paralelo
const pngBuffers = await Promise.all(
  sizes.map(async (size) => {
    const buffer = await sharp(svgBuffer)
      .resize(size, size)   // redimensiona mantendo proporção
      .png()                // converte para PNG com canal alpha (transparência)
      .toBuffer();
    return { size, buffer };
  })
);

// ─── Salva os PNGs individuais ────────────────────────────────────────────────
for (const { size, buffer } of pngBuffers) {
  if (size === 180) {
    // 180px → Apple Touch Icon (substituí o favicon.png original)
    const dest = path.join(publicDir, 'favicon.png');
    fs.writeFileSync(dest, buffer);
    console.log(`  ✅ favicon.png      (${size}×${size}px) — Apple Touch Icon`);
  } else {
    // Os outros ficam como arquivos intermediários temporários
    const dest = path.join(publicDir, `favicon-${size}.png`);
    fs.writeFileSync(dest, buffer);
    console.log(`  ✅ favicon-${size}.png    (${size}×${size}px)`);
  }
}

// ─── Monta o favicon.ico com múltiplos tamanhos ───────────────────────────────
//
// Formato ICO:
//   [Header: 6 bytes]
//   [Directory: N × 16 bytes, um por tamanho]
//   [Dados PNG de cada tamanho, em sequência]
//
// Header ICO:
//   Bytes 0-1: Reserved (sempre 0x0000)
//   Bytes 2-3: Type (0x0001 = ICO)
//   Bytes 4-5: Número de imagens

const icoSizes = [16, 32, 48]; // tamanhos que vão no ICO
const icoPngs = pngBuffers.filter(({ size }) => icoSizes.includes(size));

// Offset inicial = tamanho do header (6) + diretório (16 bytes × n imagens)
let dataOffset = 6 + icoPngs.length * 16;

const headerBuf = Buffer.alloc(6);
headerBuf.writeUInt16LE(0, 0);              // Reserved
headerBuf.writeUInt16LE(1, 2);              // Type: ICO
headerBuf.writeUInt16LE(icoPngs.length, 4); // Número de imagens

// Monta o diretório de entradas
const directoryBuffers = icoPngs.map(({ size, buffer }) => {
  const entry = Buffer.alloc(16);
  // Dimensão: 0 significa 256 no formato ICO. Para ≤ 255, usa o valor direto.
  entry.writeUInt8(size === 256 ? 0 : size, 0); // Width
  entry.writeUInt8(size === 256 ? 0 : size, 1); // Height
  entry.writeUInt8(0, 2);                        // Color count (0 = truecolor)
  entry.writeUInt8(0, 3);                        // Reserved
  entry.writeUInt16LE(1, 4);                     // Color planes
  entry.writeUInt16LE(32, 6);                    // Bits per pixel
  entry.writeUInt32LE(buffer.length, 8);         // Size dos dados da imagem
  entry.writeUInt32LE(dataOffset, 12);           // Offset dos dados no arquivo
  dataOffset += buffer.length;
  return entry;
});

// Concatena tudo: header + diretório + dados PNG
const icoBuffer = Buffer.concat([
  headerBuf,
  ...directoryBuffers,
  ...icoPngs.map(({ buffer }) => buffer),
]);

const icoDest = path.join(publicDir, 'favicon.ico');
fs.writeFileSync(icoDest, icoBuffer);
console.log(`  ✅ favicon.ico      (${icoSizes.join('+')}px multi-tamanho)`);

// ─── Remove os arquivos PNG intermediários ────────────────────────────────────
for (const size of icoSizes) {
  const tmp = path.join(publicDir, `favicon-${size}.png`);
  if (fs.existsSync(tmp)) {
    fs.unlinkSync(tmp);
  }
}

console.log('\n✨ Favicons gerados com sucesso!');
console.log('   public/favicon.svg  → SVG vetorial (todos os navegadores modernos)');
console.log('   public/favicon.ico  → ICO 16+32+48px (Windows / fallback)');
console.log('   public/favicon.png  → PNG 180px (Apple Touch Icon)');
