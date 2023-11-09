import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Traveller D',
    url: '/traveller',
    icon: 'fa fa-plane-arrival',
    class: 'view-drawer--link',
    children: [
      {
        name: 'Registration',
        url: '/traveller/registration'
      },
      {
        name: 'Check Up',
        url: '/traveller/check_up'
      },
      {
        name: 'Follow Up',
        url: '/traveller/follow_up'
      }
    ]
  }
];