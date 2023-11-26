import { Component, OnInit} from "@angular/core";


@Component({
  selector: "app-library-component",
  templateUrl: "./aboutus.component.html"
})

export class AboutusComponent implements OnInit {
  ngOnInit() {
    const cartInfo = document.querySelector('.member-info.cart');
    const cartCooking = document.querySelector('.cart-cooking');
    const cartIntelligence = document.querySelector('.cart-intelligence');
    cartInfo?.addEventListener('mouseenter', () => {
      cartCooking?.classList.add('active');
    });

    cartInfo?.addEventListener('mouseleave', () => {
      cartCooking?.classList.remove('active');
    });
  }
}
