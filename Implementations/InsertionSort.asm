	.intel_syntax noprefix
	.text
	.globl	insertionsort
	.type	insertionsort, @function
insertionsort:
.LFB0:
	.cfi_startproc
	push	rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	mov	rbp, rsp
	.cfi_def_cfa_register 6
	mov	QWORD PTR -40[rbp], rdi
	mov	QWORD PTR -48[rbp], rsi
	mov	rax, QWORD PTR -40[rbp]
	mov	QWORD PTR -16[rbp], rax
	add	QWORD PTR -40[rbp], 4
	jmp	.L2
.L6:
	mov	rax, QWORD PTR -40[rbp]
	mov	eax, DWORD PTR [rax]
	mov	DWORD PTR -20[rbp], eax
	mov	rax, QWORD PTR -40[rbp]
	sub	rax, 4
	mov	QWORD PTR -8[rbp], rax
	jmp	.L3
.L5:
	mov	rax, QWORD PTR -8[rbp]
	lea	rdx, 4[rax]
	mov	rax, QWORD PTR -8[rbp]
	mov	eax, DWORD PTR [rax]
	mov	DWORD PTR [rdx], eax
	sub	QWORD PTR -8[rbp], 4
.L3:
	mov	rax, QWORD PTR -8[rbp]
	cmp	rax, QWORD PTR -16[rbp]
	jb	.L4
	mov	rax, QWORD PTR -8[rbp]
	mov	eax, DWORD PTR [rax]
	cmp	DWORD PTR -20[rbp], eax
	jl	.L5
.L4:
	mov	rax, QWORD PTR -8[rbp]
	lea	rdx, 4[rax]
	mov	eax, DWORD PTR -20[rbp]
	mov	DWORD PTR [rdx], eax
	add	QWORD PTR -40[rbp], 4
.L2:
	mov	rax, QWORD PTR -40[rbp]
	cmp	QWORD PTR -48[rbp], rax
	jnb	.L6
	nop
	nop
	pop	rbp
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE0:
	.size	insertionsort, .-insertionsort
	.section	.note.GNU-stack,"",@progbits
