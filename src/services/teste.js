import { http } from '../services/config'

export default	{

	salvar:(produto)=>{
		return http.post('teste',produto);
  },
    
	atualizar:(identificardor, produto)=>{
		return http.put('projeto/' + identificardor , produto);
  },

  listar:()=>{
		return http.get('teste')
  },
    
	apagar:(produto)=>{
		return http.delete('teste' + produto)
	}
}