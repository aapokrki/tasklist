import { Component, Output, EventEmitter } from '@angular/core'
import { Task } from '../../Task'
import { UiService } from 'src/app/services/ui.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()
  text: string
  day: string
  reminder: boolean = false
  information: string
  showAddTask: boolean = false
  subscription: Subscription

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.showAddTask = value
    })
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!')
      return
    }
    if (!this.day) {
      alert('Please add a day!')
      return
    }

    const newTask = {
      title: this.text,
      day: this.day,
      reminder: this.reminder,
      information: this.information,
    }

    this.onAddTask.emit(newTask)

    this.text = ''
    this.day = ''
    this.reminder = false
    this.information = ''
  }
}
