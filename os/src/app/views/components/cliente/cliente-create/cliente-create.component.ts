import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
  };

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])

  constructor(private router : Router, private service : ClienteService) { }

  ngOnInit(): void {
  }

  cancel() : void {
    this.router.navigate(['clientes']);
  }

  create(): void {
    this.service.create(this.cliente).subscribe(
      (resposta) => {
        this.router.navigate(["clientes"]);
        this.service.message("Cliente criado com sucesso");
      },
      (err) => {
        if (err.error.error.match("já cadastrado")) {
          this.service.message(err.error.error);
        }else if(err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
          this.service.message("CPF inválido!");          
        }
      }
    );
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
