let sepet = [];

function sepeteEkle(ad, fiyat) {
    const varolan = sepet.find(item => item.ad === ad);
    if (varolan) { varolan.adet += 1; } 
    else { sepet.push({ ad: ad, fiyat: parseInt(fiyat), adet: 1 }); }
    sepetiGuncelle();
}

function sepetiGuncelle() {
    const liste = document.getElementById("sepet-listesi");
    const toplamEl = document.getElementById("toplam-tutar");
    liste.innerHTML = "";
    let toplam = 0;

    sepet.forEach((urun, i) => {
        toplam += (urun.fiyat * urun.adet);
        const li = document.createElement("li");
        li.innerHTML = `${urun.ad} x ${urun.adet} - ${urun.fiyat * urun.adet} TL`;
        liste.appendChild(li);
    });
    toplamEl.innerText = toplam;
}

function siparisVer() {
    const ad = document.getElementById("musteri-ad").value;
    const adres = document.getElementById("musteri-adres").value;
    const toplam = document.getElementById("toplam-tutar").innerText;

    if (sepet.length === 0 || !ad || !adres) {
        alert("Lütfen sepeti doldurun, adınızı ve adresinizi yazın.");
        return;
    }

    // Google Kayıt (Sessizce)
    const formID = "1HI342ngxVLPkw1C9KQOHQJtEIYSVDkUxIJsAiSF4qnU";
    const detay = sepet.map(u => `${u.ad} (${u.adet})`).join(", ");
    const url = `https://docs.google.com/forms/d/e/${formID}/formResponse?entry.2005620554=${encodeURIComponent(ad)}&entry.1045781291=${encodeURIComponent(adres)}&entry.1065046570=${encodeURIComponent(detay)}&entry.839337160=${encodeURIComponent(toplam)}&submit=Submit`;
    fetch(url, { mode: 'no-cors' });

    // WhatsApp Mesajı
    let mesaj = `*YENİ SİPARİŞ*%0A*İsim:* ${ad}%0A*Adres:* ${adres}%0A*Ürünler:* ${detay}%0A*Toplam:* ${toplam} TL`;
    window.location.href = `https://wa.me/905327669102?text=${mesaj}`;
}

// Butonları bağla
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("sepete-ekle-btn")) {
        sepeteEkle(e.target.dataset.urun, e.target.dataset.fiyat);
    }
});
