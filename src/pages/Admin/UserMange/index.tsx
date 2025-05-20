import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import {Image} from 'antd';
import { useRef } from 'react';
import {searchuser} from "@/services/ant-design-pro/api";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};



const columns: ProColumns<API.UserListItem>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    copyable: true,
  },{
    title: '头像',
    dataIndex: 'avatarUrl',
     render: (_,record)=>(
     <div>
       <Image src={record.avatarUrl} width={100}/>
     </div>
     )
  },{
    title: '性别',
    dataIndex: 'gender',
    valueEnum: {
      0: {text: '男' },
      1:{ text: "女" }
    }
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },{
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
  },{
    title: '状态',
    dataIndex: 'status',

  }
  ,{
    title: '星球id',
    dataIndex: 'planetCode',

  },{
    title: '权限',
    dataIndex: 'permission',
    valueEnum: {
      0: {text: '普通权限',status: 'Default'},
      1:{ text: "管理员权限",status: 'success'}
    }

  },{
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime'
  },{
    title: '更改时间',
    dataIndex: 'updateTime',
    valueType: 'dateTime'
  } ,
  // {
  //   disable: true,
  //   title: '状态',
  //   dataIndex: 'state',
  //   filters: true,
  //   onFilter: true,
  //   ellipsis: true,
  //   valueType: 'select',
  //   valueEnum: {
  //     all: { text: '超长'.repeat(50) },
  //     open: {
  //       text: '未解决',
  //       status: 'Error',
  //     },
  //     closed: {
  //       text: '已解决',
  //       status: 'Success',
  //       disabled: true,
  //     },
  //     processing: {
  //       text: '解决中',
  //       status: 'Processing',
  //     },
  //   },
  // },
  // {
  //   disable: true,
  //   title: '标签',
  //   dataIndex: 'labels',
  //   search: false,
  //   renderFormItem: (_, { defaultRender }) => {
  //     return defaultRender(_);
  //   },
  //   render: (_, record) => (
  //     <Space>
  //       {record.labels.map(({ name, color }) => (
  //         <Tag color={color} key={name}>
  //           {name}
  //         </Tag>
  //       ))}
  //     </Space>
  //   ),
  // },


  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.UserListItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
       // const userList = await searchuser();
       //  return  {
       //    data: userList
       //  }
        try {
          const response = await searchuser(params);
          console.log(response)
          return {
            data: response?.data || [],
            success: response?.success !== false,
            total: response?.total || 0,
          };
        }
        catch (error){
          console.log(error)
          return {
            data: [],
            success: false,
            total: 0,
          };
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="所有用户"
      toolBarRender={() => [

      ]}
    />
  );
};
