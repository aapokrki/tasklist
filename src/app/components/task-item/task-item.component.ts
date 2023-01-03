import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Task } from '../../Task'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task: Task
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter()
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter()

  faTimes = faTimes

  constructor(private router: Router) {}

  onDelete(task: Task) {
    console.log(task)
    this.onDeleteTask.emit(task)
  }

  onToggle(task: Task) {
    this.onToggleReminder.emit(task)
  }

  onToggleInfo(task: Task) {
    if (this.hasTaskRoute(task)) {
      this.router.navigate(['/'])
      return
    }
    const url = `/tasks/${task.id}`
    this.router.navigate([url])
  }

  hasTaskRoute(task: Task) {
    return this.router.url === `/tasks/${task.id}`
  }
}
