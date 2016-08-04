
function getMessage(a, b) {
  if(typeof(a)==="boolean"){
    if (a){
      return "Переданное GIF-изображение анимировано и содержит " + b + " кадров";
    }
    else {
      return "Переданное GIF-изображение не анимировано";
    }
  }

  if(typeof(a) === "number") {                                                   // Проверка первого параметра на тип number
    return "Переданное SVG-изображение содержит %a% объектов и %b% атрибутов".replace('%a%', a).replace('%b%', b * 4);
  };

  if(Array.isArray(a)) {
    if(Array.isArray(a) && Array.isArray(b)) {

    var artifactsSquare = 0;
    for (var i = 0; i < a.length && i < b.length ; i++) {                       // Сумма произведений соответствующий аргументов массивов
      artifactsSquare += a[i] * b[i];
     }
    return "Общая площадь артефактов сжатия: %artifactsSquare% пикселей".replace("%artifactsSquare%", artifactsSquare);
  }
    else {
    var amountOfRedPoints = 0;
    for (var i = 0; i < a.length; i++) {                                         // Сумма аргументов массива первого параметра
      amountOfRedPoints += a[i];
    };
    return "Количество красных точек во всех строчках изображения: %amountOfRedPoints%".replace('%amountOfRedPoints%', amountOfRedPoints);
  }
}
}

