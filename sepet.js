let sepet = [];

function sepeteEkle(ad, fiyat) {
    const varolan = sepet.find(item => item.ad === ad);
    if (varolan) {
        varolan.adet += 1;
    } else {
        sepet.push({ ad: ad, fiyat: parseInt(fiyat), adet: 1 });
    }
    sepetiGuncelle();
}

function miktarAzalt(i) {
    if (sepet[i].adet > 1) { sepet[i].adet--; }
    else { sepet.splice(i, 1); }
    sepetiGuncelle();
}

function miktarArtir(i) {
    sepet[i].adet++;
    sepetiGuncelle();
}

function sepetiGuncelle() {
    const liste = document.getElementById("sepet-listesi");
    const toplamEl = document.getElementById("toplam-tutar");
    const sayac = document.getElementById("sepet-sayaci-menu");
    
    liste.innerHTML = "";
    let toplam = 0;

    sepet.forEach((urun, i) => {
        toplam += (urun.fiyat * urun.adet);
        const li = document.createElement("li");
        li.style.cssText = "display:flex; justify-content:space-between; margin-bottom:10px; font-size:13px; border-bottom:1px solid #eee; padding-bottom:5px;";
        li.innerHTML = `
            <span>${urun.ad}</span>
            <div>
                <button onclick="miktarAzalt(${i})" style="padding:0 5px">-</button>
                <span>${urun.adet}</span>
                <button onclick="miktarArtir(${i})" style="padding:0 5px">+</button>
            </div>
            <span>${urun.fiyat * urun.adet} TL</span>
        `;
        liste.appendChild(li);
    });

    toplamEl.innerText = toplam;
    if(sayac) sayac.innerText = sepet.reduce((a, b) => a + b.adet, 0);
}

function siparisVer() {
    const ad = document.getElementById("musteri-ad").value.trim();
    const adres = document.getElementById("musteri-adres").value.trim();
    const toplam = document.getElementById("toplam-tutar").innerText;

    if (sepet.length === 0) { alert("Sepetiniz boş!"); return; }
    if (!ad || !adres) { alert("Lütfen adınızı ve adresinizi yazın!"); return; }

    // Google Form Kaydı
    const formID = "1HI342ngxVLPkw1C9KQOHQJtEIYSVDkUxIJsAiSF4qnU";
    const detay = sepet.map(u => `${u.ad} (${u.adet} Adet)`).join(", ");
    const googleUrl = `https://docs.google.com/forms/d/e/${formID}/formResponse?entry.2005620554=${encodeURIComponent(ad)}&entry.1045781291=${encodeURIComponent(adres)}&entry.1065046570=${encodeURIComponent(detay)}&entry.839337160=${encodeURIComponent(toplam)}&submit=Submit`;
    
    fetch(googleUrl, { mode: 'no-cors' });

    // WhatsApp Mesajı
    let mesaj = `*YENİ SİPARİŞ*%0A*Müşteri:* ${ad}%0A*Adres:* ${adres}%0A*Ürünler:* ${detay}%0A*Toplam:* ${toplam} TL`;
    window.location.href = `https://wa.me/905327669102?text=${mesaj}`;
}

// Butonları Dinle
document.addEventListener("click", (e) => {
    const btn = e.target.closest('.sepete-ekle-btn');
    if (btn) {
        sepeteEkle(btn.dataset.urun, btn.dataset.fiyat);
    }
});
