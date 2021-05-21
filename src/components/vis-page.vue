<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
    :row-style="{ height: '50px' }"
  >
    <el-table-column prop="filename" label="文件名"> </el-table-column>
    <el-table-column prop="colno" label="列号"> </el-table-column>
    <el-table-column prop="lineno" label="行号"> </el-table-column>
    <el-table-column prop="message" label="错误"> </el-table-column>
    <el-table-column prop="stack" label="错误堆栈"> </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄",
        // },
        // {
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1517 弄",
        // },
        // {
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1519 弄",
        // },
        // {
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1516 弄",
        // },
      ],
    };
  },
  created() {
    axios.get("http://localhost:3000/errlist").then((res) => {
      console.log(res);
      this.tableData = res.data.data;
    });
  },
};
</script>
