import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Traveller',
    url: '/traveller',
    icon: 'fa fa-plane-arrival',
    class: 'view-drawer--link',
    children: [
      {
        name: 'Register',
        url: '/traveller/register'
      }
    ]
  },
];