function ModalGalery() {
  let hotel = [];
  const buttons = document.querySelectorAll("[data-carousel-button]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? -1 : 1;
      const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]");

      const activeSlide = slides.querySelector("[data-active]");
      let newIndex = [...slides.children].indexOf(activeSlide) + offset;
      if (newIndex < 0) newIndex = slides.children.length - 1;
      if (newIndex >= slides.children.length) newIndex = 0;

      slides.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;
    });
  });

  const closeButton = document.querySelector("[data-close-button]");
  const modal = document.querySelector(".carousel");

  /*   closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  }); */

  /*   closeButton.onclick = function () {
    modal.style.display = "none";
  }; */

  /*  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
  } */

  let styles = {
    display: "none",
  };

  function test() {
    modal = styles;
  }
  return (
    <div className="carousel" data-carousel>
      <button onClick={test} className="close" data-carousel-close="close">
        &times;
      </button>
      <button className="carousel-button prev" data-carousel-button="prev">
        &#8249;
      </button>
      <button className="carousel-button next" data-carousel-button="next">
        &#8250;
      </button>
      <ul data-slides>
        <li className="slide" data-active>
          <img src={hotel.acf.image} />
        </li>
        <li className="slide">
          <img src={hotel.acf.modal_image_1} />
        </li>
        <li className="slide">
          <img src={hotel.acf.modal_image_2} />
        </li>
      </ul>
    </div>
  );
}

export default ModalGalery;
