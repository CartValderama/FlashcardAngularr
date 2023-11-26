import { Component, OnInit} from "@angular/core";


@Component({
  selector: "app-library-component",
  templateUrl: "./aboutus.component.html"
})

export class AboutusComponent implements OnInit {
  ngOnInit() {
    const memberInfo = document.querySelector('.member-info');
    const test = document.querySelector('.test');

    memberInfo?.addEventListener('mouseenter', () => {
      test?.classList.add('active');
    });

    memberInfo?.addEventListener('mouseleave', () => {
      test?.classList.remove('active');
    });
  }
}
