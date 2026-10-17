/* ==========================================
   WEBSITE PABRIK TAHU - SCRIPT
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. LIGHTBOX GALERI
     ========================================== */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galeriItems   = document.querySelectorAll('.galeri-item img');

  // Buka lightbox saat gambar galeri diklik
  galeriItems.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  // Fungsi tutup lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Klik tombol close
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Klik area luar gambar
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Tekan ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });


    /* ==========================================
     2. STATUS BUKA / TUTUP OTOMATIS
     Buka setiap hari: 07.00 - 17.00 WIB
     ========================================== */
  const statusEl = document.getElementById('statusBuka');

  if (statusEl) {
    const sekarang = new Date();
    const jam      = sekarang.getHours();
    const menit    = sekarang.getMinutes();
    const waktu    = jam + menit / 60;   // contoh: 14.30 => 14.5

    const BUKA  = 7;    // jam 07.00
    const TUTUP = 17;   // jam 17.00

    const isBuka = waktu >= BUKA && waktu < TUTUP;
    const span   = statusEl.querySelector('span');

    if (isBuka) {
      span.textContent = '🟢 Sedang Buka';
      span.classList.remove('tutup');
      span.classList.add('buka');
    } else {
      span.textContent = '🔴 Sedang Tutup';
      span.classList.remove('buka');
      span.classList.add('tutup');
    }
  }

    /* ==========================================
     3. TOGGLE GALERI (Lihat Semua)
     ========================================== */
  const btnGaleri   = document.getElementById('btnGaleri');
  const galeriGrid  = document.getElementById('galeriGrid');

  if (btnGaleri && galeriGrid) {
    const btnText = btnGaleri.querySelector('.btn-text');

    btnGaleri.addEventListener('click', () => {
      const isExpanded = galeriGrid.classList.toggle('expanded');
      btnGaleri.classList.toggle('expanded', isExpanded);

      if (isExpanded) {
        btnText.textContent = 'Tampilkan Lebih Sedikit';
      } else {
        btnText.textContent = 'Lihat Semua Foto';
        // Scroll halus ke atas section galeri saat menutup
        document.getElementById('galeri').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

});