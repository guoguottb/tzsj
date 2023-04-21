import request from '@/utils/request'
export  function getSearchData(data) {
  return request({
	  headers: {
		'Accept': 'application/json' ,
	  },
	  url: '/weida/getCommonListJson',
	  method: 'post',
	 
	  data:data
  })
};
export  function getData(data) {
  return request({
    
	url: '/common/commonListJson',
	method: 'post',
	data:data
  })
};


