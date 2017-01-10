/**
 * Created by lon on 1/9/17.
 */
import { RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { Main, Notes, About, Auth } from './containers'
import { AuthService } from './services'

export const routes: ModuleWithProviders = RouterModule.forRoot(
    [
        {
            path : '',
            component: Main,
            canActivate: [AuthService], // Takes an array of services that implement the CanActivate interface from Angular Router
            children: [
                {
                    path: '',
                    component: Notes
                },
                {
                    path: 'about',
                    component: About
                }
            ]
        },
        {
            path: 'auth',
            component: Auth
        },
        {
            path: '**',
            redirectTo:''
        }
    ]
)