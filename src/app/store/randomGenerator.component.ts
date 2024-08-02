import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BlackList } from "../model/blackList.model";

@Component({
   templateUrl: 'randomGenerator.component.html'
})
export class RandomGeneratorComponent {
   public blackList: BlackList[] = [];
   public questionChoice: Number = 0;
   public studentChoice: Number = 0;
   public limit: boolean = false;

   random() {
      let aux = Math.round(Math.random() * 24);
      let question = Math.round(Math.random() * 5);
      let exist = this.blackList.find(item => item.student == aux);
      if (exist || aux == 0 || question == 0)
         this.random();
      else {
         this.studentChoice = aux;
         this.questionChoice = question;
         if (!this.limit)
            this.blackList.push(new BlackList(aux, question));
         if (this.blackList.length == 24)
            this.limit = true;
      }

      console.log(exist + " length: " + this.blackList.length);
   }
}
