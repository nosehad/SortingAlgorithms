	.intel_syntax noprefix
	.text
	.globl	quicksort
	.type	quicksort, @function
quicksort:
.LFB0:
	.cfi_startproc
	push	rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	mov	rbp, rsp
	.cfi_def_cfa_register 6
	sub	rsp, 48
	mov	QWORD PTR -40[rbp], rdi
	mov	QWORD PTR -48[rbp], rsi
	mov	rax, QWORD PTR -40[rbp]
	cmp	rax, QWORD PTR -48[rbp]
	jnb	.L10
	mov	rax, QWORD PTR -48[rbp]
	mov	eax, DWORD PTR [rax]
	mov	DWORD PTR -20[rbp], eax
	mov	rax, QWORD PTR -40[rbp]
	mov	QWORD PTR -8[rbp], rax
	mov	rax, QWORD PTR -48[rbp]
	mov	QWORD PTR -16[rbp], rax
	jmp	.L4
.L6:
	add	QWORD PTR -8[rbp], 4
.L5:
	mov	rax, QWORD PTR -8[rbp]
	mov	eax, DWORD PTR [rax]
	cmp	DWORD PTR -20[rbp], eax
	jg	.L6
	jmp	.L7
.L8:
	sub	QWORD PTR -16[rbp], 4
.L7:
	mov	rax, QWORD PTR -16[rbp]
	mov	eax, DWORD PTR [rax]
	cmp	DWORD PTR -20[rbp], eax
	jl	.L8
	mov	rax, QWORD PTR -8[rbp]
	cmp	QWORD PTR -16[rbp], rax
	jb	.L4
	mov	rax, QWORD PTR -8[rbp]
	mov	eax, DWORD PTR [rax]
	mov	DWORD PTR -24[rbp], eax
	mov	rax, QWORD PTR -16[rbp]
	mov	edx, DWORD PTR [rax]
	mov	rax, QWORD PTR -8[rbp]
	mov	DWORD PTR [rax], edx
	mov	rax, QWORD PTR -16[rbp]
	mov	edx, DWORD PTR -24[rbp]
	mov	DWORD PTR [rax], edx
	add	QWORD PTR -8[rbp], 4
	sub	QWORD PTR -16[rbp], 4
.L4:
	mov	rax, QWORD PTR -8[rbp]
	cmp	QWORD PTR -16[rbp], rax
	jnb	.L5
	mov	rdx, QWORD PTR -16[rbp]
	mov	rax, QWORD PTR -40[rbp]
	mov	rsi, rdx
	mov	rdi, rax
	call	quicksort
	mov	rdx, QWORD PTR -48[rbp]
	mov	rax, QWORD PTR -8[rbp]
	mov	rsi, rdx
	mov	rdi, rax
	call	quicksort
	jmp	.L1
.L10:
	nop
.L1:
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE0:
	.size	quicksort, .-quicksort
	.section	.note.GNU-stack,"",@progbits
