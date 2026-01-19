let sepet = [];

function sepeteEkle(ad, fiyat) {
    const varolanUrun = sepet.find(item => item.ad === ad);
    if (varolanUrun) {
        varolanUrun.adet += 1;
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

function urunSil(index) {
    sepet.splice(index, 1);
    sepetiGuncelle();
}

function sepetiGuncelle() {
    const sepetListesi = document.getElementById("sepet-listesi");
    const toplamTutarElement = document.getElementById("toplam-tutar");
    const sepetSayaci = document.getElementById("sepet-sayaci-menu");
    
    if(!sepetListesi) return;
    sepetListesi.innerHTML = "";
    let toplam = 0;

    sepet.forEach((urun, index) => {
        toplam += (urun.fiyat * urun.adet);
        const li = document.createElement("li");
        li.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:8px; border-bottom:1px solid #eee; font-size:13px;";
        li.innerHTML = `
            <div style="flex:1"><strong>${urun.ad}</strong><br>${urun.fiyat} TL</div>
            <div style="display:flex; align-items:center; gap:5px;">
                <button onclick="miktarAzalt(${index})">-</button>
                <span>${urun.adet}</span>
                <button onclick="miktarArtir(${index})">+</button>
                <button onclick="urunSil(${index})" style="color:red; border:none; background:none;"><i class="fas fa-trash"></i></button>
            </div>`;
        sepetListesi.appendChild(li);
    });

    if(toplamTutarElement) toplamTutarElement.innerText = toplam;
    if(sepetSayaci) sepetSayaci.innerText = sepet.reduce((a, b) => a + b.adet, 0);
}

function siparisVer() {
    const ad = document.getElementById("musteri-ad").value.trim();
    const adres = document.getElementById("musteri-adres").value.trim();
    const toplamTutar = document.getElementById("toplam-tutar").innerText;

    if (sepet.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }
    if (!ad || !adres) {
        alert("Lütfen adınızı ve teslimat adresinizi yazın.");
        return;
    }

    // Google Form Kaydı
    const formID = "1HI342ngxVLPkw1C9KQOHQJtEIYSVDkUxIJsAiSF4qnU";
    let urunDetaylari = sepet.map(u => `${u.ad} (${u.adet} Adet)`).join(", ");
    const googleFormUrl = `https://docs.google.com/forms/d/e/${formID}/formResponse?entry.2005620554=${encodeURIComponent(ad)}&entry.1045781291=${encodeURIComponent(adres)}&entry.1065046570=${encodeURIComponent(urunDetaylari)}&entry.839337160=${encodeURIComponent(toplamTutar)}&submit=Submit`;

    fetch(googleFormUrl, { mode: 'no-cors' });

    // WhatsApp Mesajı
    let mesaj = `*YENİ SİPARİŞ*%0A%0A*Müşteri:* ${ad}%0A*Adres:* ${adres}%0A--------------------------%0A`;
    sepet.forEach(urun => {
        mesaj += `- ${urun.ad} (${urun.adet} Adet) - ${urun.fiyat * urun.adet} TL%0A`;
    });
    mesaj += `--------------------------%0A*Toplam:* ${toplamTutar} TL`;

    window.location.href = `https://wa.me/905327669102?text=${mesaj}`;
}

// Butonları Dinle
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", function(e) {
        const btn = e.target.closest('.sepete-ekle-btn');
        if (btn) {
            const ad = btn.getAttribute("data-urun");
            const fiyat = btn.getAttribute("data-fiyat");
            sepeteEkle(ad, fiyat);
        }
    });
});
