let sepet = [];

// Sepete Ürün Ekleme Fonksiyonu
function sepeteEkle(ad, fiyat) {
    const varolanUrun = sepet.find(item => item.ad === ad);

    if (varolanUrun) {
        varolanUrun.adet += 1;
    } else {
        sepet.push({
            ad: ad,
            fiyat: parseInt(fiyat),
            adet: 1
        });
    }
    sepetiGuncelle();
}

// Miktarı Azaltma
function miktarAzalt(index) {
    if (sepet[index].adet > 1) {
        sepet[index].adet -= 1;
    } else {
        urunSil(index);
    }
    sepetiGuncelle();
}

// Miktarı Artırma
function miktarArtir(index) {
    sepet[index].adet += 1;
    sepetiGuncelle();
}

// Ürünü Tamamen Silme
function urunSil(index) {
    sepet.splice(index, 1);
    sepetiGuncelle();
}

// Sepeti Görsel Olarak Güncelleme
function sepetiGuncelle() {
    const sepetListesi = document.getElementById("sepet-listesi");
    const toplamTutarElement = document.getElementById("toplam-tutar");
    const sepetSayaci = document.getElementById("sepet-sayaci-menu");
    
    if(!sepetListesi) return;

    sepetListesi.innerHTML = "";
    let toplam = 0;

    sepet.forEach((urun, index) => {
        const urunToplam = urun.fiyat * urun.adet;
        toplam += urunToplam;

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.padding = "10px";
        li.style.borderBottom = "1px solid #eee";
        
        li.innerHTML = `
            <div style="flex: 1; text-align: left;">
                <strong style="font-size: 14px;">${urun.ad}</strong><br>
                <small>${urun.fiyat} TL x ${urun.adet}</small>
            </div>
            <div style="display: flex; align-items: center; gap: 5px;">
                <button onclick="miktarAzalt(${index})" style="background:#eee; border:1px solid #ccc; padding:2px 8px; cursor:pointer; border-radius:3px;">-</button>
                <span style="min-width: 20px; text-align: center;">${urun.adet}</span>
                <button onclick="miktarArtir(${index})" style="background:#eee; border:1px solid #ccc; padding:2px 8px; cursor:pointer; border-radius:3px;">+</button>
                <button onclick="urunSil(${index})" style="background:#ff4757; color:white; border:none; padding:5px 8px; cursor:pointer; border-radius:3px; margin-left:5px;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        sepetListesi.appendChild(li);
    });

    if (toplamTutarElement) toplamTutarElement.innerText = toplam;
    if (sepetSayaci) sepetSayaci.innerText = sepet.reduce((a, b) => a + b.adet, 0);
}

// WhatsApp Mesajı Gönderme
function siparisVer() {
    if (sepet.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }

    let mesaj = "Merhaba, şu ürünleri sipariş vermek istiyorum:%0A%0A";
    sepet.forEach(urun => {
        mesaj += `* ${urun.ad} (${urun.adet} Adet) - Toplam: ${urun.fiyat * urun.adet} TL%0A`;
    });
    
    const toplamTutar = document.getElementById("toplam-tutar").innerText;
    mesaj += `%0AGenel Toplam: *${toplamTutar} TL*`;

    const telefon = "905327669102";
    window.open(`https://wa.me/${telefon}?text=${mesaj}`, "_blank");
}

// Butonlara Tıklama Özelliği Ekleme
document.addEventListener("click", function(e) {
    if (e.target && (e.target.classList.contains('sepete-ekle-btn') || e.target.parentElement.classList.contains('sepete-ekle-btn'))) {
        let buton = e.target.classList.contains('sepete-ekle-btn') ? e.target : e.target.parentElement;
        const ad = buton.getAttribute("data-urun");
        const fiyat = buton.getAttribute("data-fiyat");
        sepeteEkle(ad, fiyat);
    }
});
