import { Component, OnInit } from '@angular/core';
import { <%= classify(name) %> } from './<%= dasherize(name) %>.model';
import { <%= classify(name) %>DataService } from './<%= dasherize(name) %>.service';

@Component({
  selector: '<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: ['./<%= dasherize(name) %>.component.scss']
})
export class <%= classify(name) %>Component implements OnInit {

  public <%= camelize(name) %>s: <%= classify(name) %>[];

  constructor(
    private readonly <%= camelize(name) %>DataService: <%= classify(name) %>DataService
  ) { }

  ngOnInit(): void {
    this.<%= camelize(name) %>DataService.getAll().subscribe(<%= camelize(name) %>s => {
      this.<%= camelize(name) %>s = <%= camelize(name) %>s;
    });
  }
}