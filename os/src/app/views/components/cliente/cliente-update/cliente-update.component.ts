import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  id_cliente = ''

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
  };

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])

  constructor(private router : Router, private service : ClienteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cliente = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  update() : void {
    this.service.update(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes']);
      this.service.message("Cliente Atualizado com sucesso!");
    },(err) => {
      if (err.error.error.match("já cadastrado")) {
        this.service.message(err.error.error);
      }else if(err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
        this.service.message("CPF inválido!");          
      }
    }
  );
}

  findById() : void {
    this.service.findById(this.id_cliente).subscribe(resposta => {
      this.cliente = resposta
    })
  }

  cancel() : void {
    this.router.navigate(['clientes']);
  }

  errorValidName() {
    if(this.nome.invalid) {
      return 'O nome dever ter entre 5 e 100 letras';
    }
    return false;
  }
  errorValidCPF() {
    if(this.cpf.invalid) {
      return 'O CPF ser válido! Ex.: 111.222.333-00';
    }
    return false;
  }
  errorValidTelefone() {
    if(this.telefone.invalid) {
      return 'O Telefone deve ser válido! Ex.: (37) 98877-3322 ';
    }
    return false;
  }

}
