import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs';
const Random = Mock.Random;
const token = Random.string('upper', 32, 32);
const adminInfo = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: Random.image(),
  desc: 'manager',
  password: Random.string('upper', 4, 16),
  token,
  permissions: [
    {
      label: '主控台',
      value: 'dashboard_console',
    },
    {
      label: '基础列表删除',
      value: 'basic_list_delete',
    },
  ],
};
export default [
  {
    url: '/api/login', // 注意，这里只能是string格式
    timeout: 1000,
    method: 'post',
    response: () => {
      return {
        code: 200,
        result:token,
        message:'ok',
        type: 'success'
      }
    }
  },
  {
    url: '/api/admin_info', // 注意，这里只能是string格式
    timeout: 1000,
    method: 'get',
    response: () => {
      return {
        code: 200,
        result:adminInfo,
        message:'ok',
        type: 'success'
      }
    }
  }
] as MockMethod[]
