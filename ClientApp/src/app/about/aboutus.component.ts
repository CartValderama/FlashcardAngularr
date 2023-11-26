import { Component, OnInit} from "@angular/core";


@Component({
  selector: "app-library-component",
  templateUrl: "./aboutus.component.html"
})

export class AboutusComponent implements OnInit {
  ngOnInit() {
    const cartInfo = document.querySelector('.member-info.cart');
    const emilInfo = document.querySelector('.member-info.emil');
    const elijahtInfo = document.querySelector('.member-info.elijah');

    const cartCooking = document.querySelector('.cart-cooking');
    const cartIntelligence = document.querySelector('.cart-intelligence');
    const cartPunctuality = document.querySelector('.cart-punctuality');
    const cartHeight = document.querySelector('.cart-height');

    const emilCuriosity = document.querySelector('.emil-curiosity');
    const emilStrength = document.querySelector('.emil-strength');
    const emilSleeping = document.querySelector('.emil-sleeping');
    const emilHeight = document.querySelector('.emil-height');



    cartInfo?.addEventListener('mouseenter', () => {
      cartCooking?.classList.add('active');
      cartIntelligence?.classList.add('active');
      cartPunctuality?.classList.add('active');
      cartHeight?.classList.add('active');
    });

    cartInfo?.addEventListener('mouseleave', () => {
      cartCooking?.classList.remove('active');
      cartIntelligence?.classList.remove('active');
      cartPunctuality?.classList.remove('active');
      cartHeight?.classList.remove('active');
    });

    emilInfo?.addEventListener('mouseenter', () => {
      emilCuriosity?.classList.add('active');
      emilStrength?.classList.add('active');
      emilSleeping?.classList.add('active');
      emilHeight?.classList.add('active');
    });

    emilInfo?.addEventListener('mouseleave', () => {
      emilCuriosity?.classList.remove('active');
      emilStrength?.classList.remove('active');
      emilSleeping?.classList.remove('active');
      emilHeight?.classList.remove('active');
    });
  }
}
