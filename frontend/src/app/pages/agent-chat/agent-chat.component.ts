import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleArrowRight,
  faFaceSmile,
  faSearch,
  faUser,
  faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agent-chat',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule],
  templateUrl: './agent-chat.component.html',
  styleUrl: './agent-chat.component.css'
})
export class AgentChatComponent {
  sendIcon = faCircleArrowRight
  smileIcon = faFaceSmile
  searchIcon = faSearch
  userIcon = faUser
  dotsIcon = faEllipsisVertical
}
