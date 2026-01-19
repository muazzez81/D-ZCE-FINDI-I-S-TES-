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
    if (sepet[index].adet > 1) { sepet[index].adet -= 1; } 
    else { sepet.splice(index, 1); }
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
        li.style.cssText = "display:flex; justify-content:space-between; padding:5px; border-bottom:1px solid #eee; font-size:13px;";
        li.innerHTML = `<span>${urun.ad} x ${urun.adet}</span> <div><button onclick="miktarAzalt(${i})">-</button> <button onclick="miktarArtir(${i})">+</button></div>`;
        liste.appendChild(li);
    });
    toplamEl.innerText = toplam;
    if(sayac) sayac.innerText = sepet.reduce((a, b) => a + b.adet, 0);
}

function siparisVer() {
    const ad = document.getElementById("musteri-ad").value.trim();
    const adres = document.getElementById("musteri-adres").value.trim();
    const toplam = document.getElementById("toplam-tutar").innerText;

    if (sepet.length === 0 || !ad || !adres) {
        alert("Lütfen sepeti doldurun, adınızı ve adresinizi yazın.");
        return;
    }

    const formID = "1HI342ngxVLPkw1C9KQOHQJtEIYSVDkUxIJsAiSF4qnU"; 
    const urunDetay = sepet.map(u => `${u.ad} (${u.adet} Adet)`).join(", ");
    
    // Google Form Gönderim Linki
    const postUrl = `https://docs.google.com/forms/d/e/${formID}/formResponse`;

    // Gizli Form Oluşturma
    const gizliForm = document.createElement('form');
    gizliForm.method = 'POST';
    gizliForm.action = postUrl;
    gizliForm.target = 'gizli_iframe';

    // SENİN FORMUNA ÖZEL GÜNCEL ENTRY ID'LERİ
    const alanlar = {
        "entry.2005620554": ad,          // 1. Soru: Müşteri Ad Soyad
        "entry.1045781291": adres,       // 2. Soru: Adres
        "entry.1065046570": urunDetay,   // 3. Soru: Sipariş Detayı
        "entry.839337160": toplam        // 4. Soru: Toplam Tutar
    };

    for (let key in alanlar) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = alanlar[key];
        gizliForm.appendChild(input);
    }

    // Görünmez İframe Kontrolü
    let iframe = document.getElementById('gizli_iframe');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'gizli_iframe';
        iframe.name = 'gizli_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }

    document.body.appendChild(gizliForm);
    gizliForm.submit();

    // WhatsApp Mesajı
    let mesaj = `*YENİ SİPARİŞ*%0A*Müşteri:* ${ad}%0A*Adres:* ${adres}%0A*Ürünler:* ${urunDetay}%0A*Toplam:* ${toplam} TL`;
    
    setTimeout(() => {
        window.location.href = `https://wa.me/905327669102?text=${mesaj}`;
    }, 1000);
}
