import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id:number;
  MinFat: number;
  MaxFat: number;
  MinDens: number;
  MaxDens:number;
  rate:number;
}

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supply.html',
  styleUrls: ['./supply.css']
})
export class Supply implements OnInit {


  products: Product[] = [];
  initems: Initems[] = [];
  total: number = 0;
  insentive: number = 0;


  MinFat:number | null = null;
  MaxFat: number | null = null;
  MinDens: number | null = null;
  MaxDens: number | null = null;
  rate:number | null = null;

  showModal = false;
  isEdit = false;
  editId: number | null = null;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const data = localStorage.getItem('milk');
    this.products = data ? JSON.parse(data) : [];
  }

  openModal(): void {
    this.showModal = true;
    this.isEdit = false;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.MinFat = null;
    this.MaxFat = null;
    this.MinDens = null;
    this.MaxDens = null;
    this.rate=null;
    this.isEdit = false;
    this.editId = null;
  }

  editProduct(p: Product): void {
    this.showModal = true;
    this.isEdit = true;

  }
  saveProduct(): void {
    if (!this.MinFat || !this.MaxFat || !this.MinDens || !this.MaxFat || !this.rate) return;
    let products: Product[] = JSON.parse(localStorage.getItem('milk') || '[]');
    if (this.isEdit && this.editId !== null) {
      products.push({
              id: Date.now(),
              MinFat: this.MinFat,
              MaxFat: this.MaxFat,
              MinDens: this.MinDens,
              MaxDens: this.MaxFat,
              rate: this.rate,
      });
    }
    localStorage.setItem('milk', JSON.stringify(products));
    this.loadProducts();
    this.closeModal();
  }

  getInsentive(item:initems): number {
    let insentive = 0;

    switch (item.rate) {
      case '':
        if (item.rate > 70) {
           insentive += 20;
        }
        break;

      case 1:
        if (item.rate > 60) {
           insentive += 30;
        }
        break;

      case 2:
        if (item.rate > 50)
        {
           insentive += 40;
        }
        break;

      case 3:
         if (item.rate > 40)
         {
           insentive += 30;
         }
        break;
    }
    return insentive;
  }
 
  calculateBaseAmount(){
    const result=this.initems.reduce(
      (acc,item)=>{
        const baseAmount=
      }
    )
  }

  calculateTotal() {
    const result = this.initems.reduce(
      (acc, item) => {
        const itemTotal = item.total+ item.insentive;
        const FinalAmount = this.getInsentive(item);
        return acc;
      },
      { total: 0, insentive: 0 }
    );
  }
}