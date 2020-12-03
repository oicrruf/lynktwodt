import {useState} from 'react';
import axios from 'axios';


export function axiosRequest(endpoint,method,data) {
  
        const AllEnpoint = {
          login : "http://educalink.makeyoursystem.com/dev/public/api/auth/login",
          signup : "http://educalink.makeyoursystem.com/dev/public/api/auth/signup",
          news : "http://educalink.makeyoursystem.com/dev/public/api/auth/news",
        };

        let header = {};

        switch (endpoint) {
          case ('login' || signup):
            header = {'Content-Type': 'application/json'};
          break;
        
          default:
            header = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2QxZDc1Y2JjMGUxNWEyYjBmMjJkNzQ3MmIyODM5NTM1ZWYxMDI4MjE3MTAzYTZmOWE3M2I1ZGI4Mjc3M2MwMTgyYjYwYTllMWM3ODJiYjkiLCJpYXQiOjE2MDI4ODE2ODgsIm5iZiI6MTYwMjg4MTY4OCwiZXhwIjoxNjM0NDE3Njg4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.e8-rMHJhf_zkm1Ddn67AP4Jv1Mw1MVYcxLg0iGfGju_R38JgIWedrmNtK6aJku-8gb_v45ZF9L_i-1ntL17JYK-mnYQrhwRaZvlRgS6d7wF3EI_eiNasazjx_kq4nrgmyQau5SWtrSc4hNpcJxIZGdKnRhBrmMYuan_yoMlnpaT_5Nf6JRKcxQebmx8OGtnCB6_DYCjpHTgsxg0-T-ctJMC7WXb4wI1Oxw-QnCA8PsSl1oxmFVaXZu_8LpkMP5m7_tQJABqUeVz-oC47R6cc5VYsgMEkgx5zZ0t3byfI99Iv3IiRIZ-BDv5paXKf81x4SZ154CE5xnmhC3mdXBIdIGI4mDzwZ6zAW0NN74tJjFney_ta5OXGCSZTBsKTeKHTeybwDXi4bEh-fY5kCCV0qpGFOzc7RcEK2jsEcUG5Hw8O21sM2IMs9yWLUzh-nouzWTBbk0WY7w-olqPsl2rX1OMIIPM-dPEfFg_tuKcH1PmWsc6wcJYfICZQvrc45JHmbaJKHGyky8ctcnzBEDEFeVCVcjVzqhFZ0nq-zToQmp8E0Ui9hRB8zK5_4N9T5g4gTjpidqCmkmlb0L_-kbkAHOIAkyS8eAhfYWaNSKxMxb216oUTXnxakbe3XAQnQXg9QDEgVeG1n63FQ1MK7C5R0pRimFtki7HbmQlCWWwEDuo' 
                    };
          break;

          }

          let contentAxios = {
            method: method,
            url: AllEnpoint.[endpoint],
            headers: header,
            data:data
          };


          return  axios(contentAxios);
         
  }