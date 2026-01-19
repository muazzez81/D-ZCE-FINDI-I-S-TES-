function siparisVer() {
    const ad = document.getElementById("musteri-ad").value.trim();
    const adres = document.getElementById("musteri-adres").value.trim();
    const toplam = document.getElementById("toplam-tutar").innerText;

    if (sepet.length === 0 || !ad || !adres) {
        alert("Lütfen sepeti doldurun, adınızı ve adresinizi yazın.");
        return;
    }

    // FORM ID: https://forms.gle/MVNcibu2GH18vSJK8
    const formID = "1FAIpQLSckeDlZKUpiSJGDXUlXcWTysxuGuxwZcPc6WaXAJRM4BrJbUQ"; 
    const urunDetay = sepet.map(u => `${u.ad} (${u.adet} Adet)`).join(", ");
    
    const postUrl = `https://docs.google.com/forms/d/e/${formID}/formResponse`;

    const gizliForm = document.createElement('form');
    gizliForm.method = 'POST';
    gizliForm.action = postUrl;
    gizliForm.target = 'gizli_iframe';

    // Verilerin Tabloda Doğru Sütuna Gitmesi İçin Eşleştirme:
    const alanlar = {
        "entry.2069695679": ad,         // Müşteri Ad Soyad sütununa gider
        "entry.1018861343": adres,      // Adres sütununa gider
        "entry.1353130456": urunDetay,  // Sipariş Detayı sütununa gider (Ürünler buraya düşmeli)
        "entry.1983802554": toplam      // Toplam Tutar sütununa gider
    };

    for (let key in alanlar) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = alanlar[key];
        gizliForm.appendChild(input);
    }

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

    // WhatsApp Mesajı (Yedek olarak tüm bilgiler burada da var)
    let mesaj = `*YENİ SİPARİŞ*%0A*Müşteri:* ${ad}%0A*Adres:* ${adres}%0A*Ürünler:* ${urunDetay}%0A*Toplam:* ${toplam} TL`;
    
    setTimeout(() => {
        window.location.href = `https://wa.me/905327669102?text=${mesaj}`;
    }, 1000);
}
