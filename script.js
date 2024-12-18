document.addEventListener("DOMContentLoaded", () => {
  // Sayfa geçişi için fonksiyon
  const showPage = (pageId) => {
    // Tüm sayfaları gizle
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');

    // İlgili sayfayı göster
    document.getElementById(pageId).style.display = 'block';
  };

  // Öğrenci kaydını localStorage'a kaydetme
  const studentForm = document.getElementById('student-form');
  if (studentForm) {
    studentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const studentData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        school: document.getElementById('school').value,
        schoolNum: document.getElementById('school-num').value,
        city: document.getElementById('city').value,
        district: document.getElementById('district').value,
      };

      // Öğrenci verisini localStorage'a kaydet
      localStorage.setItem('studentData', JSON.stringify(studentData));

      alert("Öğrenci kaydı başarıyla yapıldı!");
      showPage('waste-entry');
    });
  }

  // Atık veri girişi işlemi
  const wasteEntryForm = document.getElementById('waste-entry-form');
  if (wasteEntryForm) {
    wasteEntryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const wasteData = {
        studentName: document.getElementById('student-name').value,
        kg: document.getElementById('kg').value,
        wasteType: document.getElementById('waste-type').value,
        separate: document.getElementById('separate').value,
      };

      // Puan hesaplama (Örnek: Kağıt için 5 puan/kg)
      const wastePoints = {
        kağıt: 5,
        plastik: 3,
        cam: 2,
        metal: 4,
        elektronik: 10,
        yağ: 8,
        tekstil: 6,
        pil: 7
      };

      const points = wastePoints[wasteData.wasteType];
      const totalPoints = points * wasteData.kg;

      // Atık verisini localStorage'a kaydet
      let allWasteData = JSON.parse(localStorage.getItem('allWasteData')) || [];
      wasteData.totalPoints = totalPoints;
      allWasteData.push(wasteData);
      localStorage.setItem('allWasteData', JSON.stringify(allWasteData));

      alert("Atık verisi başarıyla kaydedildi!");
      showPage('view-data');
    });
  }

  // Öğrenci geçmişini görüntüleme
  const viewData = document.getElementById('student-history');
  const allWasteData = JSON.parse(localStorage.getItem('allWasteData')) || [];
  allWasteData.forEach((data) => {
    const wasteEntry = document.createElement('div');
    wasteEntry.classList.add('history-entry');
    wasteEntry.innerHTML = `
      <p><strong>Öğrenci Adı:</strong> ${data.studentName}</p>
      <p><strong>Atık Türü:</strong> ${data.wasteType}</p>
      <p><strong>Atık Miktarı:</strong> ${data.kg} kg</p>
      <p><strong>Puan:</strong> ${data.totalPoints}</p>
      <p><strong>Ayrıştırıldı mı:</strong> ${data.separate}</p>
    `;
    viewData.appendChild(wasteEntry);
  });
});
