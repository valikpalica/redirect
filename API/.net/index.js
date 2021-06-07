//const authorization = 'Bearer DDjBoI1tCurqNkMMDxq8w7JATT9bvj8NebdFBnON4yT0VghXbB5N7XyeIS6vP2-ULlUCChvCYJ96QwFcjPJzf6f2mo3_466x4mo4mxx7Cp-ERJVTzn0CqtAn_sEYcDZIsS9Va7byyOZZZsZN_gFMBwknWcf9v4A5ol3FwJ5uRgNHxz-HqfY4lNBNnqGOYIPST9R4FyOYV0-_2_PkoLRRj-7OblemzuwG739RNnVw6Lz5ZdAHbZR7mnG0ISlmdXeq-3WfpcHSvuCPpRx96RgeZNwPmmh148_Gwgx7pFGVSppsomcQBtDaczd9BCtcNtnIZ5596Eid7m_dVgVGsGSrQZSORs5pe3i_5D4K15Y_XZDcWpn4wYeRHeJjEZ9plw1yAq63hi3H7AhhVGqpOPK60GXPfhfgntrEIPmncjjTuUFN2zBYMH8aI6Yco5f-ovKdsZp0--ZNRAEBpdrrQoAur8pLuRVsZTv4knvpWxl4Bmz4qTrxLjQFx7F1MXX4w0ucTOK42RiN8gmi92qujsmBOHaseBeb86yjpu9MXP0VOrY3me0_9L8k8I9EVfxAZt2SZEN2QJCA-wFHO64kyHP-k3uQnynFqwfwZ487gw2qdD177rw6K_FXn197SEJ7IUF2dfxlOA'
const rp = require('request-promise');
const getInfo = async (authorization) =>{
        let option = {
            method: 'GET',
            uri:'https://auth.fxcess.com/account/userinfo',
            headers:{
                'authorization':authorization
            },
            json:true
        };
        let data = await rp(option);
        return data.id;
}

module.exports = getInfo