let sepet = [];

// Sepete Ürün Ekleme Fonksiyonu
function sepeteEkle(ad, fiyat) {
    // Ürün zaten sepette var mı kontrol et
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
    
    if(!sepetListesi) return; // Eğer sepet sayfası açık değilse hata vermesin

    sepetListesi.innerHTML = "";
    let toplam = 0;
    let toplamAdet = 0;

    sepet.forEach((urun, index) => {
        const urunToplam = urun.fiyat * urun.adet;
        toplam += urunToplam;
        toplamAdet += urunAdet;

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.padding = "10px";
        li.style.borderBottom = "1px solid #eee";
        
        li.innerHTML = `
            <div style="flex: 1;">
                <strong>${urun.ad}</strong><br>
                <small>${urun.fiyat} TL x ${urun.adet}</small>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <button onclick="miktarAzalt(${index})" style="background:#ddd; border:none; padding:5px 10px; cursor:pointer; border-radius:3px;">-</button>
                <span>${urun.adet}</span>
                <button onclick="miktarArtir(${index})" style="background:#ddd; border:none; padding:5px 10px; cursor:pointer; border-radius:3px;">+</button>
                <button onclick="urunSil(${index})" style="background:#ff4757; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:3px; margin-left:10px;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        sepetListesi.appendChild(li);
    });

    toplamTutarElement.innerText = toplam;
    sepetSayaci.innerText = sepet.reduce((a, b) => a + b.adet, 0);
}

// WhatsApp Mesajı Gönderme
function siparisVer() {
    if (sepet.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }

    let mesaj = "Merhaba, şu ürünleri sipariş vermek istiyorum:%0A";
    sepet.forEach(urun => {
        mesaj += `- ${urun.ad} (${urun.adet} Adet) - ${urun.fiyat * urun.adet} TL%0A`;
    });
    mesaj += `%0AToplam Tutar: ${document.getElementById("toplam-tutar").innerText} TL`;

    const telefon = "905327669102";
    window.open(`https://wa.me/${telefon}?text=${mesaj}`, "_blank");
}

// Sayfa yüklendiğinde butonları dinle
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".sepete-ekle-btn").forEach(buton => {
        buton.addEventListener("click", () => {
            const ad = buton.getAttribute("data-urun");
            const fiyat = buton.getAttribute("data-fiyat");
            sepeteEkle(ad, fiyat);
        });
    });
});
