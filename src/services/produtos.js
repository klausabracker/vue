import { http } from '../services/config'

export default	{

	salvar:(produto)=>{
		return http.post('projeto',produto);
  },
    
	atualizar:(identificardor, produto)=>{
		return http.put('projeto/' + identificardor , produto);
  },

  listar:()=>{
		return http.get('projeto')
  },
    
	apagar:(produto)=>{
		return http.delete('projeto' + produto)
	}
}