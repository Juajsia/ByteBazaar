import { inject } from '@angular/core'
import { Router } from '@angular/router'

export const loginGuard = (): boolean => {
    const router = inject(Router)
    if (localStorage.getItem('token')) {
        return true
    } else {
        router.navigate([''])
        return false
    }
}

export const loginStatus = (): boolean => {
    if (localStorage.getItem('token')) {
        return true
    } else {
        return false
    }
}