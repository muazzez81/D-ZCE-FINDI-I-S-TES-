function siparisVer() {
    const ad = document.getElementById("musteri-ad").value;
    const adres = document.getElementById("musteri-adres").value;
    const toplamTutar = document.getElementById("toplam-tutar").innerText;

    if (sepet.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }
    if (!ad || !adres) {
        alert("Lütfen adınızı ve teslimat adresinizi yazın.");
        return;
    }

    // --- GOOGLE FORM KAYIT AYARLARI ---
    // Sizin formunuzun ID'si: 1HI342ngxVLPkw1C9KQOHQJtEIYSVDkUxIJsAiSF4qnU
    const formID = "1HI342ngxVLPkw1C9KQOHQJtEIYSVDkUxIJsAiSF4qnU";
    
    // Sepetteki ürünleri tek bir metin haline getirelim
    let urunDetaylari = sepet.map(u => `${u.ad} (${u.adet} Adet)`).join(", ");

    // NOT: Alttaki entry.XXXXX numaraları Google Form'daki sorularınızın sırasına göredir.
    // Eğer formda soruların sırasını değiştirdiyseniz bu numaraları güncellemek gerekebilir.
    const googleFormUrl = `https://docs.google.com/forms/d/e/${formID}/formResponse?` +
        `entry.2005620554=${encodeURIComponent(ad)}&` + 
        `entry.1045781291=${encodeURIComponent(adres)}&` + 
        `entry.1065046570=${encodeURIComponent(urunDetaylari)}&` + 
        `entry.839337160=${encodeURIComponent(toplamTutar)}&submit=Submit`;

    // Formu sessizce (arka planda) gönderir
    fetch(googleFormUrl, { mode: 'no-cors' })
        .then(() => console.log("Google Tabloya Kaydedildi"))
        .catch((err) => console.log("Kayıt Hatası:", err));

    // --- WHATSAPP MESAJ KISMI ---
    let mesaj = `*YENİ SİPARİŞ (SİSTEME KAYDEDİLDİ)*%0A%0A`;
    mesaj += `*Müşteri:* ${ad}%0A`;
    mesaj += `*Adres:* ${adres}%0A`;
    mesaj += `--------------------------%0A`;
    
    sepet.forEach(urun => {
        mesaj += `- ${urun.ad} (${urun.adet} Adet) - ${urun.fiyat * urun.adet} TL%0A`;
    });
    
    mesaj += `--------------------------%0A`;
    mesaj += `*Toplam Tutar:* ${toplamTutar} TL`;

    const telefon = "905327669102";
    window.open(`https://wa.me/${telefon}?text=${mesaj}`, "_blank");
}
