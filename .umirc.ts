import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {
  //   layout: 'side',
  // },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      name: '首页',
      // title: '首页',
      routes: [
        {
          path: '/submenu1',
          component: 'menu1',
          title: '菜单1-1',
          name: 'submenu1',
        },
        {
          path: '/submenu2',
          component: 'menu2',
          title: '菜单1-2',
          name: 'submenu2',
        },
        {
          path: '/sub1',
          component: '@/pages/menu3/index',
          // title: '菜单2-1',
          name: 'sub1',
        },
        {
          path: '/sub2',
          component: '@/pages/menu4/index',
          // title: '菜单2-2',
          name: 'sub2',
        },
      ],
    },
  ],
  fastRefresh: {},
});
