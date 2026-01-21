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
        li.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid #eee; font-size:14px;";
        li.innerHTML = `
            <span><strong>${urun.ad}</strong><br>${urun.fiyat} TL x ${urun.adet}</span> 
            <div style="display:flex; gap:5px;">
                <button onclick="miktarAzalt(${i})" style="padding:2px 8px;">-</button> 
                <button onclick="miktarArtir(${i})" style="padding:2px 8px;">+</button>
            </div>`;
        liste.appendChild(li);
    });
    
    if(toplamEl) toplamEl.innerText = toplam;
    if(sayac) sayac.innerText = sepet.reduce((a, b) => a + b.adet, 0);
}

function siparisVer() {
    const adInput = document.getElementById("musteri-ad");
    const adresInput = document.getElementById("musteri-adres");
    const toplamEl = document.getElementById("toplam-tutar");

    const ad = adInput ? adInput.value.trim() : "";
    const adres = adresInput ? adresInput.value.trim() : "";
    const toplam = toplamEl ? toplamEl.innerText : "0";

    if (sepet.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }
    if (!ad || !adres) {
        alert("Lütfen adınızı ve adresinizi yazın.");
        return;
    }

    // Ürünleri metne dök
    const urunDetay = sepet.map(u => `- ${u.ad} (${u.adet} Adet)`).join("%0A");

    // WhatsApp Mesaj Taslağı
    let mesaj = `*YENİ FINDIK SİPARİŞİ*%0A%0A`;
    mesaj += `*Müşteri:* ${ad}%0A`;
    mesaj += `*Adres:* ${adres}%0A%0A`;
    mesaj += `*Ürünler:*%0A${urunDetay}%0A%0A`;
    mesaj += `*Toplam Tutar:* ${toplam} TL`;
    
    // Doğrudan WhatsApp'a yönlendir
    window.location.href = `https://wa.me/905327669102?text=${mesaj}`;
}
