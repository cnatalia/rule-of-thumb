import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent  {

  @Input() list:any = [];
  @Input() arrayList:any ="";
  @Input() arrayNamesList:any ="";
  @Input() id:any ="";
  @Output() optionSelected = new EventEmitter<{}>();

  public inputText = ''
  public listFocus = false;
  public inputFocus = false;



  public selectOption(id:any, value:any, idItem:any) {

    const optionsElement = document.getElementById(id)
    const item = document.getElementById(idItem)
    const elementOption = document.getElementById(`${id}_input`);
    const input = document.getElementsByTagName('input')

    for (let val of input as any) {
      if (val.id === `${id}_input`) {
        this.inputText = value
      }
    }


    optionsElement!.classList.remove('display-block');
    optionsElement!.classList.add('display-none');

    const items = document.getElementsByClassName("itemOptions");
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('active')
    }

    item!.classList.add('active');
    elementOption!.classList.add('optionSelected_close')
    elementOption!.classList.remove('optionSelected_open')

    this.optionSelected.emit({ id: idItem, value: value });

  }

  public getOptions(id:any) {
    const element = document.getElementById(id)
    const elementOption = document.getElementById(`${id}_input`)

    if (element!.classList.contains('display-none')) {
      element!.classList.remove('display-none');
      element!.classList.add('display-block');
      elementOption!.classList.add('optionSelected_open')
      elementOption!.classList.remove('optionSelected_close')

    } else {
      element!.classList.remove('display-block');
      element!.classList.add('display-none');
      elementOption!.classList.add('optionSelected_close')
      elementOption!.classList.remove('optionSelected_open')

    }

  }

  public hideOptions(id:any) {
    const element = document.getElementById(id)
    element!.classList.remove('display-block');
    element!.classList.add('display-none');
  }

  public isValid(id:any) {
    return id.inputText !== ''
  }

  public isFocused(id:any) {

    const ul = document.getElementsByTagName('ul')
    const elementOption = document.getElementById(`${id}_input`)

    for (let i = 0; i < ul.length; i++) {
      if (ul[i].id === id) {

        if (ul[i].classList.contains('display-block')) {
          ul[i].classList.remove('display-block');
          ul[i].classList.add('display-none');

          elementOption!.classList.add('optionSelected_close')
          elementOption!.classList.remove('optionSelected_open')
        }
      }
    }
  }

  public isDobleList(){

  }
}
