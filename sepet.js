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

function miktarAzalt(index) {
    if (sepet[index].adet > 1) {
        sepet[index].adet -= 1;
    } else {
        sepet.splice(index, 1);
    }
    sepetiGuncelle();
}

function miktarArtir(index) {
    sepet[index].adet += 1;
    sepetiGuncelle();
}

function sepetiGuncelle() {
    const liste = document.getElementById("sepet-listesi");
    const toplamEl = document.getElementById("toplam-tutar");
    const sayac = document.getElementById("sepet-sayaci-menu");
    
    if(!liste) return;
    liste.innerHTML = "";
    let toplam = 0;

    sepet.forEach((urun, i) => {
        toplam += (urun.fiyat * urun.adet);
        const li = document.createElement("li");
        li.style.cssText = "display:flex; justify-content:space-between; margin-bottom:10px; font-size:13px;";
        li.innerHTML = `
            <span>${urun.ad}</span>
            <div>
                <button onclick="miktarAzalt(${i})">-</button>
                <span>${urun.adet}</span>
                <button onclick="miktarArtir(${i})">+</button>
            </div>`;
        liste.appendChild(li);
    });

    toplamEl.innerText = toplam;
    sayac.innerText = sepet.reduce((a, b) => a + b.adet, 0);
}

function siparisVer() {
    const ad = document.getElementById("musteri-ad").value.trim();
    const adres = document.getElementById("musteri-adres").value.trim();
    const toplam = document.getElementById("toplam-tutar").innerText;

    if (sepet.length === 0) { alert("Sepetiniz boş!"); return; }
    if (!ad || !adres) { alert("Ad ve adres bilgilerini doldurun!"); return; }

    // Google Form Kayıt
    const formID = "1HI342ngxVLPkw1C9KQOHQJtEIYSVDkUxIJsAiSF4qnU";
    const detay = sepet.map(u => `${u.ad} (${u.adet})`).join(", ");
    const url = `https://docs.google.com/forms/d/e/${formID}/formResponse?entry.2005620554=${encodeURIComponent(ad)}&entry.1045781291=${encodeURIComponent(adres)}&entry.1065046570=${encodeURIComponent(detay)}&entry.839337160=${encodeURIComponent(toplam)}&submit=Submit`;
    
    fetch(url, { mode: 'no-cors' });

    // WhatsApp
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
