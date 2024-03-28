import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeadset, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent {
  chatBoxIcon = faHeadset
  sendIcon = faCircleArrowRight

  @ViewChild('textarea') textarea!: ElementRef;
  @ViewChild('chatboxForm') chatboxForm!: ElementRef;
  @ViewChild('chatboxMessageWrapper') chatboxMessageWrapper!: ElementRef;
  @ViewChild('chatboxNoMessage') chatboxNoMessage!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.textarea.nativeElement.addEventListener('input', () => this.handleInput());
    this.chatboxForm.nativeElement.addEventListener('submit', (e: any) => this.handleSubmit(e));
    const chatboxToggle = document.querySelector('.chatbox-toggle');
    chatboxToggle!.addEventListener('click', () => this.toggleChatbox());
  }

  handleInput(): void {
    let line = this.textarea.nativeElement.value.split('\n').length;

    if (this.textarea.nativeElement.rows < 6 || line < 6) {
      this.textarea.nativeElement.rows = line;
    }

    if (this.textarea.nativeElement.rows > 1) {
      this.chatboxForm.nativeElement.style.alignItems = 'flex-end';
    } else {
      this.chatboxForm.nativeElement.style.alignItems = 'center';
    }
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (this.isValid(this.textarea.nativeElement.value)) {
      this.writeMessage();
      setTimeout(() => this.autoReply(), 1000);
    }
  }

  addZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  writeMessage(): void {
    const today = new Date();
    let message = `
      <div class="chatbox-message-item sent">
        <span class="chatbox-message-item-text">
          ${this.textarea.nativeElement.value.trim().replace(/\n/g, '<br>\n')}
        </span>
        <span class="chatbox-message-item-time">${this.addZero(today.getHours())}:${this.addZero(today.getMinutes())}</span>
      </div>
    `;
    this.chatboxMessageWrapper.nativeElement.insertAdjacentHTML('beforeend', message);
    this.chatboxForm.nativeElement.style.alignItems = 'center';
    this.textarea.nativeElement.rows = 1;
    this.textarea.nativeElement.focus();
    this.textarea.nativeElement.value = '';
    this.chatboxNoMessage.nativeElement.style.display = 'none';
    this.scrollBottom();
  }

  autoReply(): void {
    const today = new Date();
    let message = `
      <div class="chatbox-message-item received">
        <span class="chatbox-message-item-text">
        Hi!, thanks for contact us but this is only a demo.
        </span>
        <span class="chatbox-message-item-time">${this.addZero(today.getHours())}:${this.addZero(today.getMinutes())}</span>
      </div>
    `;
    this.chatboxMessageWrapper.nativeElement.insertAdjacentHTML('beforeend', message);
    this.scrollBottom();
  }

  scrollBottom(): void {
    this.chatboxMessageWrapper.nativeElement.scrollTo(0, this.chatboxMessageWrapper.nativeElement.scrollHeight);
  }

  isValid(value: string): boolean {
    let text = value.replace(/\n/g, '');
    text = text.replace(/\s/g, '');
    return text.length > 0;
  }

  toggleChatbox(): void {
    const chatboxMessage = document.querySelector('.chatbox-message-wrapper');
    chatboxMessage!.classList.toggle('show');
  }
}
