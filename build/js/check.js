
function getMessage(a, b) {
  if(a === true && typeof(a) === "boolean") {                                    // Проверка первого параметра на тип boolean и значение true
    return "Переданное GIF-изображение анимировано и содержит " + b + " кадров";
  };

  if(a === false && typeof(a) === "boolean") {                                   //  Проверка двух параметров на тип boolean и значение false
    return "Переданное GIF-изображение не анимировано";
  };

  if(typeof(a) === "number") {                                                   // Проверка первого параметра на тип number
    return "Переданное SVG-изображение содержит %a% объектов и %b% атрибутов".replace('%a%', a).replace('%b%', b * 4);
  };

  if(Array.isArray(a) && !(Array.isArray(b))) {                                  // Проверка первого параметра на массив и второго на НЕмассив
    var amountOfRedPoints = 0;
    for (var i = 0; i < a.length; i++) {                                         // Сумма аргументов массива первого параметра
      amountOfRedPoints += a[i];
    };
    return "Количество красных точек во всех строчках изображения: %amountOfRedPoints%".replace('%amountOfRedPoints%', amountOfRedPoints);
  };

  if(Array.isArray(a) && Array.isArray(b)) {                                    // Проверка двух параметров на массив
    var artifactsSquare = 0;
    for (var i = 0; i < a.length && i < b.length ; i++) {                       // Сумма произведений соответствующий аргументов массивов
      artifactsSquare += a[i] * b[i];
     }
    return "Общая площадь артефактов сжатия: %artifactsSquare% пикселей".replace("%artifactsSquare%", artifactsSquare);
  };

};
