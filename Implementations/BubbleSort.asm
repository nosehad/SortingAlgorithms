	.intel_syntax noprefix
	.text
	.globl	bubblesort
	.type	bubblesort, @function
bubblesort:
.LFB6:
	.cfi_startproc
	push	rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	mov	rbp, rsp
	.cfi_def_cfa_register 6
	mov	QWORD PTR -24[rbp], rdi
	mov	QWORD PTR -32[rbp], rsi
	mov	BYTE PTR -9[rbp], 1
	jmp	.L2
.L6:
	mov	BYTE PTR -9[rbp], 0
	mov	rax, QWORD PTR -24[rbp]
	mov	QWORD PTR -8[rbp], rax
	jmp	.L3
.L5:
	mov	rax, QWORD PTR -8[rbp]
	mov	edx, DWORD PTR [rax]
	mov	rax, QWORD PTR -8[rbp]
	add	rax, 4
	mov	eax, DWORD PTR [rax]
	cmp	edx, eax
	jle	.L4
	mov	BYTE PTR -9[rbp], 1
	mov	rax, QWORD PTR -8[rbp]
	mov	eax, DWORD PTR [rax]
	mov	DWORD PTR -16[rbp], eax
	mov	rax, QWORD PTR -8[rbp]
	mov	edx, DWORD PTR 4[rax]
	mov	rax, QWORD PTR -8[rbp]
	mov	DWORD PTR [rax], edx
	mov	rax, QWORD PTR -8[rbp]
	lea	rdx, 4[rax]
	mov	eax, DWORD PTR -16[rbp]
	mov	DWORD PTR [rdx], eax
.L4:
	add	QWORD PTR -8[rbp], 4
.L3:
	mov	rax, QWORD PTR -8[rbp]
	cmp	rax, QWORD PTR -32[rbp]
	jne	.L5
.L2:
	cmp	BYTE PTR -9[rbp], 0
	jne	.L6
	nop
	nop
	pop	rbp
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE6:
	.size	bubblesort, .-bubblesort
	.section	.note.GNU-stack,"",@progbits
